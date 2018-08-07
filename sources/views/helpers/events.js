import {getGroupContentHeaderId, getGroupListId} from "../dictionary/mainPanel";
import {groups} from "../../models/groups";
import {getGroupPanelId} from "../dictionary/sidePanel/groupPanel";

const GROUP_CONTENT_REQUEST_EVENT_ID = "onGroupContentRequest";
const GROUP_CONTENT_SELECT_EVENT_ID = "onGroupContentSelect";

const getGroupContentRequestEventId = () => GROUP_CONTENT_REQUEST_EVENT_ID;
const onGroupContentSelectEventId = () => GROUP_CONTENT_SELECT_EVENT_ID;


const onGetGroupContentRequestEvent = (sourceHandler, targetHandler, groupId) => {
	let groupName = sourceHandler.getItem(groupId).name;
	$$(getGroupContentHeaderId()).setHTML(`<div style = 'text-align: center'>${groupName}-group content</div>`);
	$$(getGroupContentHeaderId()).refresh();

	targetHandler.clearAll();

	let setOfGroups = groups.getItem(groups.getFirstId());

	targetHandler.parse(setOfGroups.find(group => group.groupID === groupId).words);
};


const onGroupContentSelectEvent = (sourceHandler, targetHandler, id, ignoredHandler) => {
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


export {
	onGetGroupContentRequestEvent,
	onGroupContentSelectEvent,
	getGroupContentRequestEventId,
	onGroupContentSelectEventId
};
