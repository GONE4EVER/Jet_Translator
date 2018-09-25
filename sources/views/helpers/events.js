import {getGroupContentHeaderId, getGroupListId, getFullContentListId} from "../dictionary/mainPanel";
import {getGroupPanelId, getRestWordsContainerId, getGroupContentContainerId} from "../dictionary/sidePanel/groupPanel";

const GROUP_CONTENT_REQUEST_EVENT_ID = "onGroupContentRequest";
const GROUP_CONTENT_SELECT_EVENT_ID = "onGroupContentSelect";

const getGroupContentRequestEventId = () => GROUP_CONTENT_REQUEST_EVENT_ID;
const onGroupContentSelectEventId = () => GROUP_CONTENT_SELECT_EVENT_ID;

const clearFormLists = (lists) => {
	lists.forEach((list) => {
		list.clearAll();
	});
};

const onGetGroupContentRequestEvent = (sourceHandlerId, targetHandlerId, groupId) => {
	const sourceHandler = $$(sourceHandlerId);
	const targetHandler = $$(targetHandlerId);
	const wordsList = $$(getRestWordsContainerId()).getList();
	const groupContentContainerList = $$(getGroupContentContainerId()).getList();

	let groupName = sourceHandler.getItem(groupId).name;

	$$(getGroupContentHeaderId()).setHTML(`<div style = 'text-align: center'>${groupName}-group content</div>`);
	$$(getGroupContentHeaderId()).refresh();

	clearFormLists([groupContentContainerList, targetHandlerId, wordsList]);

	let data = $$(getFullContentListId()).find((obj) => {
		if (sourceHandler.getItem(groupId).words.findIndex(item => item._id === obj._id) === -1) {
			return obj;
		}
		return null;
	});


	groupContentContainerList.parse(sourceHandler.getItem(groupId).words);
	targetHandler.parse(sourceHandler.getItem(groupId).words);
	wordsList.parse(data);
};


const onGroupContentSelectEvent = (sourceHandlerId, targetHandlerId, id, ignoredHandlerId) => {
	const sourceHandler = $$(sourceHandlerId);
	const targetHandler = $$(targetHandlerId);
	const ignoredHandler = $$(ignoredHandlerId);

	const item = sourceHandler.getItem(id);
	const list = targetHandler.getParentView().queryView({view: "list"});

	if (ignoredHandler) {
		ignoredHandler.clear();
		list.clearAll();
	}
	else if (!$$(getGroupPanelId()).getValues().name) {
		$$(getGroupPanelId()).setValues($$(getGroupListId()).getSelectedItem());
	}

	if (item.translation) {
		list.show();
		list.parse(item.translation);
	}
	targetHandler.setValues(sourceHandler.getItem(id));
};


const onDataChangeRequest = () => {

};

export {
	onGetGroupContentRequestEvent,
	onGroupContentSelectEvent,
	getGroupContentRequestEventId,
	onGroupContentSelectEventId
};
