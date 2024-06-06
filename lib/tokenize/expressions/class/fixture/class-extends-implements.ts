export class CallablePolicy extends Policy implements PolicyBase {
    validate = (options?: any): boolean => {
        return this.requirements.every((requirement) => {
            return requirement.verify(options);
        });
    };
}