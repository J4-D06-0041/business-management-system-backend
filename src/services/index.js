class ItemService {
    constructor() {
        this.items = [];
    }

    fetchItems() {
        return this.items;
    }

    addItem(item) {
        this.items.push(item);
        return item;
    }
}

export default ItemService;