import {Client} from './src/client';
import {TelemetryEvent} from './src/event';
import {EventBody} from './src/eventBody';
import {PerformanceEventBody} from './src/performanceEventBody';
import {ProblemEventBody} from './src/problemEventBody';

window.d2lTelemetryBrowserClient = {};
window.d2lTelemetryBrowserClient.Client = Client;
window.d2lTelemetryBrowserClient.TelemetryEvent = TelemetryEvent;
window.d2lTelemetryBrowserClient.EventBody = EventBody;
window.d2lTelemetryBrowserClient.PerformanceEventBody = PerformanceEventBody;
window.d2lTelemetryBrowserClient.ProblemEventBody = ProblemEventBody;
