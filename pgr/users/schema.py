from django.contrib.auth import get_user_model

import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


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

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
