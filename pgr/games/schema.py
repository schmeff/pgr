import base64

from django.core.files.base import ContentFile
import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required, staff_member_required
from .models import Game


class GameType(DjangoObjectType):
    class Meta:
        model = Game


class AddGame(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String(required=True)
        summary = graphene.String()
        parental_rating = graphene.String()
        publisher = graphene.String()
        release_date = graphene.String()
        game_cover_image = graphene.String()

    @staff_member_required
    def mutate(self,
               info,
               name,
               summary=None,
               parental_rating=None,
               publisher=None,
               release_date=None,
               game_cover_image=None):
        user = info.context.user

        existing_game = Game.objects.filter(name=name).first()
        if existing_game:
            raise GraphQLError("A game with the same name has already been added")

        if release_date == '':
            release_date = None

        game = Game(
            name=name,
            summary=summary,
            parental_rating=parental_rating,
            publisher=publisher,
            release_date=release_date,
            created_by=user
        )

        if game_cover_image is not None:
            if "data:image/png;base64," not in game_cover_image:
                raise GraphQLError("Invalid image format")

            file_format, image_string = game_cover_image.split(';base64,')
            ext = file_format.split('/')[-1]

            image_file = ContentFile(base64.b64decode(image_string), name='{}_image.{}'.format(name, ext))

            game.game_cover_image = image_file

        game.save()

        return AddGame(success=True)


class Mutation(graphene.ObjectType):
    add_game = AddGame.Field()
