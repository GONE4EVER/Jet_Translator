import {getGroupContentHeaderId, getGroupListId} from "../dictionary/mainPanel";
import {getGroupPanelId} from "../dictionary/sidePanel/groupPanel";

const GROUP_CONTENT_REQUEST_EVENT_ID = "onGroupContentRequest";
const GROUP_CONTENT_SELECT_EVENT_ID = "onGroupContentSelect";

const getGroupContentRequestEventId = () => GROUP_CONTENT_REQUEST_EVENT_ID;
const onGroupContentSelectEventId = () => GROUP_CONTENT_SELECT_EVENT_ID;


const onGetGroupContentRequestEvent = (sourceHandlerId, targetHandlerId, groupId) => {
	const sourceHandler = $$(sourceHandlerId);
	const targetHandler = $$(targetHandlerId);

	let groupName = sourceHandler.getItem(groupId).name;
	$$(getGroupContentHeaderId()).setHTML(`<div style = 'text-align: center'>${groupName}-group content</div>`);
	$$(getGroupContentHeaderId()).refresh();

	targetHandler.clearAll();


	targetHandler.parse(sourceHandler.getItem(groupId).words);
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
