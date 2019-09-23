export class CalendarEvent {
  constructor(
    public readonly workItemId: number,
    public readonly title: string,
    public readonly start: Date,
    public readonly end: Date) {
  }
}

// https://github.com/fullcalendar/fullcalendar/blob/44c16bb687c911318306f1c1d0e05bfb186cc9a7/packages/core/src/structs/event-source.ts
