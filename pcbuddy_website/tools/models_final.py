# models.py

from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Manufacturer(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Component(models.Model):
    name = models.CharField(max_length=255)
    brand = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='component_images/')

    def __str__(self):
        return self.name

class Build(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    components = models.ManyToManyField(Component, through='BuildComponent')

    def __str__(self):
        return self.name

class BuildComponent(models.Model):
    build = models.ForeignKey(Build, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.build.name} - {self.component.name}'

class Review(models.Model):
    build = models.ForeignKey(Build, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.user.username} on {self.build.name}'

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    build = models.ForeignKey(Build, on_delete=models.CASCADE)
    ordered_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f'Order for {self.build.name} by {self.user.username}'
