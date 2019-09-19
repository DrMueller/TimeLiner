export class SnackBarConfiguration {
    public constructor(public displayDurationInSeconds: number) { }

    public static createDefault(): SnackBarConfiguration {
        return new SnackBarConfiguration(2.5);
    }
}
