class DefaultService {
    default = (
        text: string
    ): string => {
        return "";
    };
}

export default new DefaultService();