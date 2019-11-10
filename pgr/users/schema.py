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
        show_email = graphene.Boolean()
        name = graphene.String()
        bio = graphene.String()

    @login_required
    def mutate(self, info, name, bio):
        user = info.context.user

        if user is None:
            raise GraphQLError("You do not have permission to perform this action")

        existing_profile = Profile.objects.filter(user=user).first()

        if existing_profile is None:
            raise GraphQLError("Could not find user profile")

        existing_profile.name = name
        existing_profile.bio = bio

        existing_profile.save()
        success = True

        return SaveUserProfile(success=success)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    save_user_profile = SaveUserProfile.Field()


class Query(graphene.ObjectType):
    profile_edit = graphene.Field(ProfileType, username=graphene.String())

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
