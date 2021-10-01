import { getResultSelector } from "./getResultSelector";
import { State } from "../reducers";
import { employees } from "../api/fixtures";

const makeState = (options: Partial<State["settings"]>, data?: any[]) =>
    ({
        app: {
            visibilityCount: 30,
            result: {
                data: data || employees,
                isFetching: false,
            },
        },
        settings: {
            filters: [],
            fields: [],
            groups: [],
            sort: [],
            ...options,
        },
    } as State);

describe("Тестирование селектора getEmployeesSelector", () => {
    it("Должен фильтровать по данным в стэйте settings.filters", () => {
        const state = makeState({
            filters: [{ field: "name", value: "виктор" }],
        });

        const { items } = getResultSelector(state);

        expect(items[0].name).toBe("Виктория Тимофеевна Голубева");
    });

    it("Должен отфильтровать по значению и отсортировать по возрастанию", () => {
        const state = makeState({
            filters: [{ field: "name", value: "ич" }],
            sort: [{ field: "name", direction: 1 }],
        });

        const { items } = getResultSelector(state);

        expect(items.map((x) => x.name)).toMatchObject([
            "Анисимов Эмиль Брониславович",
            "Ладимир Брониславович Беляев",
            "Остромир Филиппович Бобров",
        ]);
    });

    it("Должен отфильтровать по значению и отсортировать по убыванию", () => {
        const state = makeState({
            filters: [{ field: "name", value: "ич" }],
            sort: [{ field: "name", direction: -1 }],
        });

        const { items } = getResultSelector(state);

        expect(items.map((x) => x.name)).toEqual([
            "Остромир Филиппович Бобров",
            "Ладимир Брониславович Беляев",
            "Анисимов Эмиль Брониславович",
        ]);
    });

    it("Должен отфильтровать по двум значениям", () => {
        const state = makeState({
            filters: [
                { field: "name", value: "ич" },
                { field: "position", value: "садовод" },
            ],
            sort: [{ field: "name", direction: -1 }],
        });

        const { items } = getResultSelector(state);

        expect(items.map((x) => x.name)).toMatchObject([
            "Анисимов Эмиль Брониславович",
        ]);
    });

    it("Должен отсортировать по двум значениям", () => {
        const data = [
            { foo: "bbb", date: "2013-05-06" },
            { foo: "aaa", date: "2012-01-02" },
            { foo: "ccc", date: "2014-01-02" },
            { foo: "ccc", date: "2015-01-02" },
            { foo: "bbb", date: "2014-06-01" },
            { foo: "aaa", date: "2014-02-02" },
        ];

        const state = makeState(
            {
                sort: [
                    // @ts-ignore
                    { field: "foo", direction: 1 },
                    // @ts-ignore
                    { field: "date", direction: -1 },
                ],
            },
            data
        );

        const { items } = getResultSelector(state);

        expect(items).toMatchObject([
            { date: "2014-02-02", foo: "aaa" },
            { date: "2012-01-02", foo: "aaa" },
            { date: "2014-06-01", foo: "bbb" },
            { date: "2013-05-06", foo: "bbb" },
            { date: "2015-01-02", foo: "ccc" },
            { date: "2014-01-02", foo: "ccc" },
        ]);
    });

    it("Должен дополнительнов вернуть отсортированные группы", () => {
        const state = makeState({
            sort: [
                { field: "name", direction: -1 },
                { field: "position", direction: 1 },
            ],
            groups: [{ field: "position" }],
        });

        const { groups } = getResultSelector(state);

        expect(groups).toMatchObject([
            { position: "Востоковед" },
            { position: "Гитарист" },
            { position: "Машинист" },
            { position: "Проводник" },
            { position: "Садовод" },
            { position: "Священнослужитель" },
            { position: "Сыровар" },
            { position: "Танатолог" },
            { position: "Танкист" },
            { position: "Фрезеровщик" },
        ]);
    });
});
