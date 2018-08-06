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
	for (let group of groups.getItem(groups.getFirstId())) {
		if (group.groupID === groupId) {
			targetHandler.parse(group.words);
			break;
		}
	}
};

const onGroupContentSelectEvent = (sourceHandler, targetHandler, id, ignoredHandler) => {
	if (ignoredHandler) {
		ignoredHandler.clear();
	}
	else if (!$$(getGroupPanelId()).getValues().name) {
		$$(getGroupPanelId()).setValues($$(getGroupListId()).getSelectedItem());
	}
	targetHandler.setValues(sourceHandler.getItem(id));
};

export {
	onGetGroupContentRequestEvent,
	onGroupContentSelectEvent,
	getGroupContentRequestEventId,
	onGroupContentSelectEventId
};
