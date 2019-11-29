import base64

from django.core.files.base import ContentFile
from django.contrib.auth import get_user_model
from .models import Profile

import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from graphql_jwt.decorators import login_required


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile


class ProfileImage(graphene.ObjectType):
    profile_image = graphene.String()


class PublicProfileType(graphene.ObjectType):
    username = graphene.String()
    name = graphene.String()
    bio = graphene.String()


class UserExistsType(graphene.ObjectType):
    exists = graphene.Boolean()


class UserIsStaffType(graphene.ObjectType):
    isStaff = graphene.Boolean()


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        existing_email = get_user_model().objects.filter(email=email.lower()).first()

        if existing_email is not None:
            raise GraphQLError('Email is already in use')

        try:
            validate_email(email.lower())
        except ValidationError:
            raise GraphQLError('Email is invalid')

        existing_user = get_user_model().objects.filter(username=username.lower()).first()

        if existing_user is not None:
            raise GraphQLError("Username is already in use")

        if len(password) < 8:
            raise GraphQLError('Password is too short')

        user = get_user_model()(
            username=username.lower(),
            email=email.lower()
        )
        user.set_password(password)
        user.save()

        profile = Profile(user=user)
        profile.save()

        return CreateUser(user=user)


class SaveUserProfile(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String()
        bio = graphene.String()
        image_url = graphene.String()

    @login_required
    def mutate(self, info, name, bio, image_url=None):
        user = info.context.user

        if user is None:
            raise GraphQLError("You do not have permission to perform this action")

        existing_profile = Profile.objects.filter(user=user).first()

        if existing_profile is None:
            raise GraphQLError("Could not find user profile")

        existing_profile.name = name
        existing_profile.bio = bio

        if image_url is not None:
            if "data:image/png;base64," not in image_url:
                raise GraphQLError("Invalid file format")

            file_format, image_string = image_url.split(';base64,')
            ext = file_format.split('/')[-1]

            image_file = ContentFile(base64.b64decode(image_string), name='{}_image.{}'.format(user.username, ext))

            if existing_profile.profile_image is not None:
                existing_profile.profile_image.delete()

            existing_profile.profile_image = image_file

        existing_profile.save()
        success = True

        return SaveUserProfile(success=success)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    save_user_profile = SaveUserProfile.Field()


class Query(graphene.ObjectType):
    profile_edit = graphene.Field(ProfileType, username=graphene.String())
    profile_image = graphene.Field(ProfileImage, username=graphene.String())
    public_profile = graphene.Field(PublicProfileType, username=graphene.String())
    user_exists = graphene.Field(UserExistsType, username=graphene.String())
    user_is_staff = graphene.Field(UserIsStaffType)

    @login_required
    def resolve_profile_edit(self, info, username=None):
        user = info.context.user
        if user.username != username:
            raise GraphQLError("You don't have permission to access this page")

        profile = Profile.objects.filter(user=user).first()
        if profile is None:
            profile = Profile(user=user)
            profile.save()

        return profile

    def resolve_public_profile(self, info, username=None):
        if username is None:
            raise GraphQLError("A username was not provided")

        user = get_user_model().objects.filter(username=username).first()
        if user is None:
            raise GraphQLError("User Profile was not found")

        profile = Profile.objects.filter(user=user).first()
        if profile is None:
            profile = Profile(user=user)
            profile.save()

        public_profile = PublicProfileType(
            username=username,
            name=profile.name,
            bio=profile.bio
        )

        return public_profile

    def resolve_profile_image(self, info, username=None):
        if username is None:
            raise GraphQLError("No username was specified")

        user = get_user_model().objects.filter(username=username).first()
        if user is None:
            raise GraphQLError("User was not found")

        profile = Profile.objects.filter(user=user).first()
        if profile is None:
            raise GraphQLError("Could not find user profile")

        if profile.profile_image.name is not None:
            # profile_image = profile.profile_image.file
            profile_image = profile.profile_image.read()
            profile_image = "data:image/png;base64," + str(base64.standard_b64encode(profile_image)).split("'")[1]
        else:
            profile_image = None

        return ProfileImage(
            profile_image=profile_image
        )

    def resolve_user_exists(self, info, username=None):
        if username is None:
            return UserExistsType(exists=False)

        user = get_user_model().objects.filter(username=username).first()
        exists = False
        if user is None:
            exists = False
        else:
            exists = True

        return UserExistsType(exists=exists)

    def resolve_user_is_staff(self, info):
        user = info.context.user

        found_user = get_user_model().objects.filter(username=user.username)

        return UserIsStaffType(isStaff=found_user.is_staff)
