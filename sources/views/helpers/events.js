import {getGroupContentHeaderId, getGroupListId} from "../dictionary/mainPanel";
import {groups} from "../../models/groups";
import {getGroupPanelId} from "../dictionary/sidePanel/groupPanel/index.js";

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
	if (ignoredHandler) {
		ignoredHandler.clear();
	}
	else if (!$$(getGroupPanelId()).getValues().name) {
		const item = $$(getGroupListId()).getSelectedItem();
		const list = $$(getGroupPanelId()).queryView({view: "list"});

		$$(getGroupPanelId()).setValues(item);
		/* console.log(item);
		list.parse(item.words);
		list.refresh(); */
	}
	targetHandler.setValues(sourceHandler.getItem(id));
};


export {
	onGetGroupContentRequestEvent,
	onGroupContentSelectEvent,
	getGroupContentRequestEventId,
	onGroupContentSelectEventId
};
