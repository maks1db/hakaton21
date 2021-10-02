type ABBType = {
    scheme: Record<string, any>;
    url?: string;
    json?: any[],
    sort?: string[],
    fields?: string[]
}

declare interface Window {
    __ABB: ABBType
}