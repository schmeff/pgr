# Generated by Django 2.2.6 on 2019-11-01 23:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20191101_1656'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='facebook_url',
            new_name='facebook',
        ),
        migrations.RenameField(
            model_name='profile',
            old_name='instagram_url',
            new_name='instagram',
        ),
        migrations.RenameField(
            model_name='profile',
            old_name='mixer_url',
            new_name='mixer',
        ),
        migrations.RenameField(
            model_name='profile',
            old_name='twitch_url',
            new_name='twitch',
        ),
        migrations.RenameField(
            model_name='profile',
            old_name='twitter_url',
            new_name='twitter',
        ),
        migrations.RenameField(
            model_name='profile',
            old_name='youtube_url',
            new_name='youtube',
        ),
    ]
