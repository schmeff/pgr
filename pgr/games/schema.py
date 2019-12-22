import base64

from django.core.files.base import ContentFile
import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import staff_member_required
from .models import Game
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import unbase64


def format_cover_image_string(cover_image_url):
    file_format, image_string = cover_image_url.split(';base64,')
    ext = file_format.split('/')[-1]

    return ContentFile(base64.b64decode(image_string), name='game_cover_image.{}'.format(ext))


class GameType(DjangoObjectType):
    class Meta:
        model = Game


class GameNode(DjangoObjectType):
    class Meta:
        model = Game
        filter_fields = {
            'name': ['iexact', 'icontains', 'istartswith'],
            'id': ['exact']
        }
        interfaces = (relay.Node, )


class GameCoverImage(graphene.ObjectType):
    game_cover_image = graphene.String()


class AddGame(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        name = graphene.String(required=True)
        summary = graphene.String()
        parental_rating = graphene.String()
        developer = graphene.String()
        release_date = graphene.String()
        game_cover_image = graphene.String()

    @staff_member_required
    def mutate(self,
               info,
               name,
               summary=None,
               parental_rating=None,
               developer=None,
               release_date=None,
               game_cover_image=None):
        user = info.context.user

        existing_game = Game.objects.filter(name=name).first()
        if existing_game:
            raise GraphQLError("A game with the same name has already been added")

        if release_date == '':
            release_date = None

        if game_cover_image == '':
            game_cover_image = None

        game = Game(
            name=name,
            summary=summary,
            parental_rating=parental_rating,
            developer=developer,
            release_date=release_date,
            created_by=user
        )

        if game_cover_image is not None:
            game.game_cover_image = format_cover_image_string(game_cover_image)

        game.save()

        return AddGame(success=True)


class EditGame(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        game_id = graphene.String(required=True)
        name = graphene.String(required=True)
        summary = graphene.String()
        parental_rating = graphene.String()
        developer = graphene.String()
        release_date = graphene.String()
        game_cover_image = graphene.String()
        game_cover_image_updated = graphene.Boolean()

    @staff_member_required
    def mutate(self,
               info,
               game_id,
               name,
               summary=None,
               parental_rating=None,
               developer=None,
               release_date=None,
               game_cover_image=None,
               game_cover_image_updated=False):
        user = info.context.user

        int_id = unbase64(game_id).split(':')[-1]
        existing_game = Game.objects.filter(id=int_id).first()
        if existing_game is None:
            raise GraphQLError("The specified game doesn't exist")

        if release_date == '':
            release_date = None

        existing_game.name = name
        existing_game.summary = summary
        existing_game.parental_rating = parental_rating
        existing_game.developer = developer
        existing_game.release_date = release_date
        existing_game.created_by = user

        if game_cover_image_updated is True:
            existing_game.game_cover_image.delete()
            if game_cover_image is not None:
                existing_game.game_cover_image = format_cover_image_string(game_cover_image)

        existing_game.save()

        return EditGame(success=True)


class Mutation(graphene.ObjectType):
    add_game = AddGame.Field()
    edit_game = EditGame.Field()


class Query(graphene.ObjectType):
    game = relay.Node.Field(GameNode)
    all_games = DjangoFilterConnectionField(GameNode)

    game_cover_image = graphene.Field(GameCoverImage, game_cover_image_name=graphene.String())

    def resolve_game_cover_image(self, info, game_cover_image_name=None):
        game = Game.objects.filter(game_cover_image=game_cover_image_name).first()

        if game is None:
            raise GraphQLError("Could not find game with given search")

        game_cover_image = None
        if game.game_cover_image.name is not None:
            game_cover_image = game.game_cover_image.read()
            game_cover_image = "data:image/jpeg;base64," + str(base64.standard_b64encode(game_cover_image)).split("'")[1]
        else:
            game_cover_image = None

        return GameCoverImage(
            game_cover_image=game_cover_image
        )
