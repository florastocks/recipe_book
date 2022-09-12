# Generated by Django 4.1.1 on 2022-09-12 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('foodtypes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default=None, max_length=100)),
                ('instructions', models.TextField(default=None, max_length=1000)),
                ('foodtype', models.ManyToManyField(related_name='recipes', to='foodtypes.foodtype')),
            ],
        ),
    ]
