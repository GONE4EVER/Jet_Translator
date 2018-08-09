import {onEditClick, onClearClick, onDeleteClick, onAddClick} from "./toolbarFuncs";


const toolbar = {
	css: {
		display: "flex",
		"flex-direction": "row",
		"justify-content": "space-around",
		"align-items": "center"
	},
	cols: [
		{
			view: "icon",
			icon: "edit",
			tooltip: "Edit selected",
			on: {
				onItemClick: onEditClick
			}
		},
		{
			view: "icon",
			icon: "paint-brush ",
			tooltip: "Clear form",
			on: {
				onItemClick: onClearClick
			}
		},
		{
			view: "icon",
			icon: "plus",
			tooltip: "Add this word to the database",
			on: {
				onItemClick: onAddClick

			}
		},
		{
			view: "icon",
			icon: "trash",
			tooltip: "Delete selected",
			on: {
				onItemClick: onDeleteClick
			}
		}
	]
};

export {
	toolbar
};
