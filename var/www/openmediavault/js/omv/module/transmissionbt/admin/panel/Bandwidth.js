/**
 * Created by JetBrains PhpStorm.
 * User: mbeck
 * Date: 28.11.11
 * Time: 20:42
 * To change this template use File | Settings | File Templates.
 */

// require("js/omv/FormPanelExt.js")
// require("js/omv/form/plugins/FieldInfo.js")

// require("js/omv/module/transmissionbt/NavigationPanel.js")
// require("js/omv/module/transmissionbt/admin/NavigationPanel.js")

Ext.ns("OMV.Module.TransmissionBT");

/**
 * @class OMV.Module.TransmissionBT.BandwidthPanel
 * @derived OMV.FormPanelExt
 */
OMV.Module.TransmissionBT.BandwidthPanel = function(config) {
	var initialConfig = {
		rpcService: "TransmissionBT",
		rpcGetMethod: "getBandwidth",
		rpcSetMethod: "setBandwidth"
	};
	Ext.apply(initialConfig, config);
	OMV.Module.TransmissionBT.BandwidthPanel.superclass.constructor.call(
	  this, initialConfig);
};
Ext.extend(OMV.Module.TransmissionBT.BandwidthPanel, OMV.FormPanelExt, {
	getFormItems : function() {
		return [{
			xtype: "fieldset",
			title: "Speed",
			defaults: {
//				anchor: "100%",
				labelSeparator: ""
			},
			items: [{
				xtype: "checkbox",
				name: "speed-limit-down-enabled",
				fieldLabel: "Limit Download",
				checked: false,
				inputValue: 1,
				boxLabel: "Enable download limit."
			},{
				xtype: "numberfield",
				name: "speed-limit-down",
				fieldLabel: "Download",
				allowDecimals: false,
				allowNegative: false,
				allowBlank: false,
				value: 100,
				plugins: [ OMV.form.plugins.FieldInfo ],
				infoText: "Limit download speed. Value is kb/s."
			},{
				xtype: "checkbox",
				name: "speed-limit-up-enabled",
				fieldLabel: "Limit Upload",
				checked: false,
				inputValue: 1,
				boxLabel: "Enable upload limit."
			},{
				xtype: "numberfield",
				name: "speed-limit-up",
				fieldLabel: "Upload",
				allowDecimals: false,
				allowNegative: false,
				allowBlank: false,
				value: 100,
				plugins: [ OMV.form.plugins.FieldInfo ],
				infoText: "Limit upload speed. Value is kb/s."
			},{
				xtype: "numberfield",
				name: "upload-slots-per-torrent",
				fieldLabel: "Upload slots",
				allowDecimals: false,
				allowNegative: false,
				allowBlank: false,
				value: 14
			}]
		},{
			xtype: "fieldset",
			title: "Turtle Mode",
			defaults: {
//				anchor: "100%",
				labelSeparator: ""
			},
			items: [{
				xtype: "checkbox",
				name: "alt-speed-enabled",
				fieldLabel: "Enable",
				checked: false,
				inputValue: 1,
				boxLabel: "Enable Turtle Mode."
			},{
				xtype: "numberfield",
				name: "alt-speed-down",
				fieldLabel: "Download",
				allowDecimals: false,
				allowNegative: false,
				allowBlank: false,
				value: 50,
				plugins: [ OMV.form.plugins.FieldInfo ],
				infoText: "Turtle Mode download speed. Value is kb/s."
			},{
				xtype: "numberfield",
				name: "alt-speed-up",
				fieldLabel: "Upload",
				allowDecimals: false,
				allowNegative: false,
				allowBlank: false,
				value: 50,
				plugins: [ OMV.form.plugins.FieldInfo ],
				infoText: "Turtle Mode upload speed. Value is kb/s."
			}]
		}];
	}
});
OMV.NavigationPanelMgr.registerPanel("transmissionbt", "admin", {
	cls: OMV.Module.TransmissionBT.BandwidthPanel,
	title: "Bandwidth",
	position: 40
});