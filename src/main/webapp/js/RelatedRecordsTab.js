/*
Copyright 2010 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jQuery, fluid, cspace*/
"use strict";

cspace = cspace || {};

(function ($, fluid) {
    
    var bindEventHandlers = function (that) {
        that.applier.modelChanged.addListener("relations", function (model, oldModel, changeRequest) {
            that.listEditor.options.listPopulationStrategy(that.listEditor.model, that.recordType, {data: model.relations}, function () {
                that.listEditor.list.refreshView();
            });
        });
        that.listEditor.events.pageReady.addListener(function () {
            that.events.afterRender.fire();
        });
    };
    
    cspace.relatedRecordsTab = function (container, recordType, uispec, applier, options) {
        var that = fluid.initView("cspace.relatedRecordsTab", container, options);        
        that.recordType = recordType;
        that.uispec = uispec;
        that.applier = applier;
        
        that.listEditor = fluid.initSubcomponent(that, "listEditor", [that.container, that.recordType, 
            that.uispec, fluid.COMPONENT_OPTIONS]);
            
        that.relationManager = fluid.initSubcomponent(that, "relationManager", [
            that.container,
            that.recordType,
            that.applier,
            fluid.COMPONENT_OPTIONS
        ]);
            
        bindEventHandlers(that);
        
        return that;
    };
    
    fluid.defaults("cspace.relatedRecordsTab", {
        listEditor: {
            type: "cspace.listEditor"
        },
        relationManager: {
            type: "cspace.relationManager"
        },
        selectors: {
            messageContainer: ".csc-message-container",
            feedbackMessage: ".csc-message",
            timestamp: ".csc-timestamp"
        },
        events: {
            afterRender: null
        }
    });
    
})(jQuery, fluid);