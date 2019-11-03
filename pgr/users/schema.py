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


class UpdateUserProfile(graphene.Mutation):
    profile = graphene.Field(ProfileType)

    class Arguments:
        name = graphene.String(required=False)
        bio = graphene.String(required=False)
        twitch = graphene.String(required=False)
        mixer = graphene.String(required=False)
        youtube = graphene.String(required=False)
        twitter = graphene.String(required=False)
        instagram = graphene.String(required=False)
        facebook = graphene.String(required=False)
        discord_username = graphene.String(required=False)

    @login_required
    def mutate(self, info, name, bio, twitch, mixer, youtube, twitter, instagram, facebook, discord_username):
        user = info.context.user

        if user is None:
            raise GraphQLError("You are not permitted to perform this action")


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
