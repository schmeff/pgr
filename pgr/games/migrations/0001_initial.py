# Generated by Django 2.2.6 on 2019-11-28 15:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('summary', models.TextField(max_length=2000)),
                ('parental_rating', models.CharField(choices=[('E', 'Everyone'), ('T', 'Teen'), ('M', 'Mature')], default=None, max_length=2, null=True)),
                ('publisher', models.CharField(max_length=50)),
                ('release_date', models.DateField(null=True)),
                ('critic_rating', models.SmallIntegerField(null=True)),
                ('player_rating', models.SmallIntegerField(null=True)),
                ('game_cover_image', models.FileField(null=True, upload_to='game_cover_images')),
            ],
        ),
    ]
