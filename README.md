# d2l-telemetry-browser-client
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependencies-image]][dependencies-url]

UI Client for sending telemetry from the browser to a telemetry service.
The purpose of this library is to make it easier to construct telemetry events matching the standardized schema (Standard Events) for generating product telemetry as defined here:

[`Base schema for UI Telemetry Events`](https://github.com/Brightspace/schema/blob/master/events/ui-telemetry-event-base.json)

[`UI Telemetry Event Schema`](https://github.com/Brightspace/schema/blob/master/events/ui-telemetry-event.json)
[`Example UI Telemetry Event`](https://github.com/Brightspace/schema/blob/master/test/ui-telemetry-event.js)

[`UI Performance Event Schema`](https://github.com/Brightspace/schema/blob/master/events/ui-performance-event.json)
[`Example UI Performance Event`](https://github.com/Brightspace/schema/blob/master/test/ui-peformance-event.js)

[`UI Problem Event Schema`](https://github.com/Brightspace/schema/blob/master/events/ui-problem-event.json)
[`Example UI Problem Event`](https://github.com/Brightspace/schema/blob/master/test/ui-problem-event.js)

And then to send the events to the [`Product Telemetry Service`](https://github.com/Brightspace/d2l-telemetry-service)


## Usage

### Setup

Install from Bower:

```shell
bower install Brightspace/d2l-telemetry-browser-client
```

Then import `d2l-telemetry-browser-client.html`:

```html
<link rel="import" href="../d2l-telemetry-browser-client/d2l-telemetry-browser-client.html">
```

The HTML import will reference the library from the CDN, but using bower and html imports will allow you to de-dupe different versions.

Alternatively you can reference it directly from the CDN

```html
<script src="https://s.brightspace.com/lib/d2l-telemetry-browser-client/0.1.0/d2l-telemetry-browser-client.js"></script>
```

Finally reference the library using the global variable `d2lTelemetryBrowserClient`

The client uses [`d2l-fetch`](https://github.com/Brightspace/d2l-fetch) for making the API requests to the telemetry service.
See the [`d2l-fetch browser compatibility`](https://github.com/Brightspace/d2l-fetch#browser-compatibility) instructions for additional requirements.

### Use

```js

const client = new window.d2lTelemetryBrowserClient.Client({
  endpoint
});

const eventBody = new window.d2lTelemetryBrowserClient.EventBody()
  .setAction('https://www.w3.org/ns/activitystreams#Create')
  .setObject('http://prd.activityfeed.us-east-1.brightspace.com/api/v1/d2l:orgUnit:6614/article/da1e037d-6a51-4d1a-ba3d-fa62fb5e3591',
 			 'https://www.w3.org/ns/activitystreams#Article');

const event = new window.d2lTelemetryBrowserClient.TelemetryEvent()
  .setDate(new Date())
  .setType('https://schema.brightspace.com/ns/common/ui-telemetry-event.json')
  .setSourceId('https://schema.brightspace.com/ns/activityfeed')
  .setBody(eventBody);

client.logUserEvent(event);

```

## Development

### Setup

```shell
yarn install
yarn run test
```

This library builds a de-umdified browserify bundle that is exposed on the global object as `d2lTelemetryBrowserClient`.

### Publishing

The Travis CI build on master branch will bump the version of the library, publish the dist/ bundle to the CDN and commit an updated `./d2l-telemetry-browser-client.html` html import file referencing the CDN library back to the repo.

Refer to `./update.sh` and `./travis.yml` for details on how this publish process works.

You can control the level of verison bump by including either `[increment major]` or `[increment patch]` in your commit message. By default it will increment minor.


[ci-url]: https://travis-ci.org/Brightspace/d2l-telemetry-browser-client
[ci-image]: https://travis-ci.org/Brightspace/d2l-telemetry-browser-client.svg
[coverage-url]: https://coveralls.io/r/Brightspace/d2l-telemetry-browser-client?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/d2l-telemetry-browser-client.svg
[dependencies-url]: https://david-dm.org/Brightspace/d2l-telemetry-browser-client
[dependencies-image]: https://img.shields.io/david/Brightspace/d2l-telemetry-browser-client.svg
