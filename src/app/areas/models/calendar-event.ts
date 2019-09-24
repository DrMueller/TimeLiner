export class CalendarEvent {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly date: Date,
    public readonly allDay: boolean,
    public readonly backgroundColor?: string,
    public readonly borderColor?: string,
    public readonly textColor?: string) {
  }
}

// https://github.com/fullcalendar/fullcalendar/blob/44c16bb687c911318306f1c1d0e05bfb186cc9a7/packages/core/src/structs/event.ts
