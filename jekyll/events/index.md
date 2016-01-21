---
layout: default
title: Events
---

<div class="gcal">
<iframe id="calendar-frame"
	src="https://www.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=btboj0i5e7nv3sk7o2bn48hjng%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=America%2FLos_Angeles"
  width="100%" height="600" frameborder="0"
																									 scrolling="no"></iframe>
</div>

<script type="text/javascript">
function resizeCalendar() {
	var calendar = document.getElementById("calendar-frame");
	calendar.width = calendar.parentElement.clientWidth;
}

resizeCalendar();
window.addEventListener("resize", resizeCalendar);
</script>

## Upcoming Events
{% capture current_time %}
  {{ site.time | date: '%s' }}
{% endcapture %}

{% assign current_time = current_time | plus:0 %}

{% comment %}
We want to keep the number of upcoming events short; for now we're
limiting it to 3, but it's easy to adjust the following line.
{% endcomment %}

{% assign upcoming_remaining = 3 %}

The calendar above contains all GCF events. Here are some that are out
of the ordinary:
{% for event in site.categories.events reversed %}
  {% assign event_date = event.date | date: '%s' | plus: 0 %}
	{% if event_date >= current_time and upcoming_remaining > 0 %}
* [{{ event.title }}]({{ site.url }}{{ site.baseurl }}{{ event.url }}) on {{ event.date | date_to_long_string }}
		{% assign upcoming_remaining = upcoming_remaining | minus:1 %}
	{% endif %}
{% endfor %}

## Past Events
{% for event in site.categories.events %}
  {% assign event_date = event.date | date: '%s' | plus: 0 %}
	{% if event_date < current_time %}
* [{{ event.title }}]({{ event.url }}) on {{ event.date | date_to_long_string }}
	{% endif %}
{% endfor %}
