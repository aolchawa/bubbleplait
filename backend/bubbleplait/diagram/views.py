from django.http import HttpResponse, JsonResponse
from django.views import View
from django.core import serializers

import json

from .models import Node, Link


class DataApi(View):
    def get(self, request):
        nodes_json = serializers.serialize('json', Node.objects.all())
        links_json = serializers.serialize('json', Link.objects.all())

        return HttpResponse("{\"nodes\": " + nodes_json + ",\"links\":" + links_json + "}", status=200)

    def post(self, request):
        Node.objects.all().delete()
        Link.objects.all().delete()
        data_json = json.loads(request.body)

        for node_json in data_json['nodes']:
            node = Node()
            node.id = node_json['id']
            node.label = node_json['label']
            node.save()

        for idx, link_json in enumerate(data_json['links']):
            link = Link()
            link.id = idx
            link.label = link_json['label']
            link.node_from = Node.objects.get(id=link_json['from'])
            link.node_to = Node.objects.get(id=link_json['to'])
            link.arrows = link_json['arrows']
            link.save()

        return JsonResponse({'status': 'ok'})
