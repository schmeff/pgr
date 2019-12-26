from .models import CriticReview
from games.models import Game
import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import staff_member_required
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay.node.node import unbase64, base64


class CriticReviewType(DjangoObjectType):
    class Meta:
        model = CriticReview


class CriticReviewNode(DjangoObjectType):
    class Meta:
        model = CriticReview
        filter_fields = {
            'name': ['iexact'],
            'id': ['exact'],
            'game': ['exact']
        }
        interfaces = (relay.Node, )


class AddCriticReview(graphene.Mutation):
    review_id = graphene.String()

    class Arguments:
        name = graphene.String(required=True)
        rating = graphene.Float()
        game_id = graphene.String()
        link = graphene.String()

    @staff_member_required
    def mutate(self, info, name, rating, game_id, link=None):
        user = info.context.user

        game_int_id = unbase64(game_id).split(':')[-1]
        game = Game.objects.filter(id=game_int_id).first()
        if game is None:
            raise GraphQLError("Invalid game id was provided")

        critic_review = CriticReview(
            name=name,
            link=link,
            rating=rating,
            game=game,
            added_by=user
        )

        critic_review.save()

        return AddCriticReview(review_id=base64("CriticReviewType:" + str(critic_review.id)))


class EditCriticReview(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        review_id = graphene.String()
        name = graphene.String(required=True)
        rating = graphene.Float()
        link = graphene.String()

    @staff_member_required
    def mutate(self, info, review_id, name, rating, link=None):
        user = info.context.user

        review_id_int = unbase64(review_id).split(':')[-1]
        existing_review = CriticReview.objects.get(id=review_id_int)

        if existing_review is None:
            raise GraphQLError("Could not find existing review with given id")

        existing_review.name = name
        existing_review.rating = rating
        existing_review.link = link
        existing_review.added_by = user

        existing_review.save()

        return EditCriticReview(success=True)


class DeleteCriticReview(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        review_id = graphene.String()

    @staff_member_required
    def mutate(self, info, review_id):
        review_id_int = unbase64(review_id).split(':')[-1]

        existing_review = CriticReview.objects.get(id=review_id_int)

        if existing_review is None:
            raise GraphQLError("Could not find existing review with given id")

        existing_review.delete()

        return DeleteCriticReview(success=True)


class Mutation(graphene.ObjectType):
    add_critic_review = AddCriticReview.Field()
    edit_critic_review = EditCriticReview.Field()
    delete_critic_review = DeleteCriticReview.Field()


class Query(graphene.ObjectType):
    critic_review = relay.Node.Field(CriticReviewNode)
    all_critic_reviews = DjangoFilterConnectionField(CriticReviewNode)
