// OpenStreetMap через Overpass
const osmQueries = {
  "АЗС": '[out:json];area[name="Таганрог"]->.a;(node["amenity"="fuel"](area.a);way["amenity"="fuel"](area.a););out count;',
  "Почта": '[out:json];area[name="Таганрог"]->.a;(node["amenity"="post_office"](area.a);way["amenity"="post_office"](area.a););out count;',
  "Пляж": '[out:json];area[name="Таганрог"]->.a;(node["natural"="beach"](area.a);way["natural"="beach"](area.a););out count;'
};