from django.db import models

class Node(models.Model):
    label = models.CharField(max_length=200)

class Link(models.Model):
    label = models.CharField(max_length=200)
    node_from = models.ForeignKey(Node, on_delete=models.CASCADE, related_name="node_from")
    node_to = models.ForeignKey(Node, on_delete=models.CASCADE, related_name="node_to")