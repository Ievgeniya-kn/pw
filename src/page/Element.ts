import { Page } from "@playwright/test";

export class Element {
    protected _page: Page
    constructor(page: Page) {
        this._page = page;
    };
}