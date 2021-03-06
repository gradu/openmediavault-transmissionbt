/**
 * This file is part of OpenMediaVault TransmissionBT.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Marcel Beck <marcel.beck@mbeck.org>
 * @copyright Copyright (c) 2011-2012 Marcel Beck
 * @website   http://omv-plugins.org
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OpenMediaVault. If not, see <http://www.gnu.org/licenses/>.
 */


// require("js/omv/Window.js")

Ext.ns("OMV.TransmissionBT");

/**
 * @class OMV.TransmissionBT.AddURLDialog
 * @config title The dialog title.
 * @config service The name of the RPC service.
 * @config method The name of the RPC method.
 * @config params Additional RPC method parameters.
 * @config waitMsg The displayed waiting message.
 */
OMV.TransmissionBT.AddURLDialog = function (config) {
	var initialConfig = {
		url        :this.url,
		title      :_("Add Torrent by URL"),
		waitMsg    :_("Adding Torrent ..."),
		width      :450,
		autoHeight :true,
		layout     :"fit",
		modal      :true,
		border     :false,
		buttonAlign:"center",
		buttons    :[
			{
				text   :_("OK"),
				handler:this.cbOkBtnHdl.createDelegate(this),
				scope  :this
			},
			{
				text   :_("Cancel"),
				handler:this.cbCancelBtnHdl.createDelegate(this),
				scope  :this
			}
		]
	};
	Ext.apply(initialConfig, config);
	OMV.TransmissionBT.AddURLDialog.superclass.constructor.call(this, initialConfig);
	this.addEvents(
					/**
					 * Fires after the installation has been finished successful.
					 */
					"success",
					"before"
	);
};
Ext.extend(OMV.TransmissionBT.AddURLDialog, OMV.Window, {
	initComponent:function () {
		this.form = new Ext.form.FormPanel({
			frame     :true,
			border    :false,
			layout    :"form",
			defaults  :{
				anchor        :"100%",
				labelSeparator:""
			},
			autoHeight:true,
			fileUpload:true,
			items     :[
				{
					xtype:"hidden",
					name :"service",
					value:this.service
				},
				{
					xtype:"hidden",
					name :"method",
					value:this.method
				},
				{
					xtype:"hidden",
					name :"params",
					value:this.params
				},
				{
					xtype     :"textfield",
					name      :"url",
					id        :"url",
					fieldLabel:_("URL")
				},
				{
					xtype     :"checkbox",
					name      :"start-download",
					id        :"start-download",
					fieldLabel:_("Start download"),
					checked   :true,
					inputValue:1
				}
			]
		});
		this.items = this.form;
		OMV.TransmissionBT.AddURLDialog.superclass.initComponent.apply(this, arguments);
	},

	/**
	 * @method cbOkBtnHdl
	 * Method that is called when the 'OK' button is pressed.
	 */
	cbOkBtnHdl:function () {
		var basicForm = this.form.getForm();
		if (!basicForm.isValid()) {
			return;
		}
		var url = Ext.getCmp('url').getValue();
		var start_download = Ext.getCmp('start-download').getValue();

		this.fireEvent("success", this, url, start_download);
		this.close();
	},

	/**
	 * @method cbCancelBtnHdl
	 * Method that is called when the 'Cancel' button is pressed.
	 */
	cbCancelBtnHdl:function () {
		this.close();
	}
});