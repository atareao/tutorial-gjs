#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject, Gdk} = imports.gi;

Gtk.init(null);

var Ventana = GObject.registerClass(
    class Ventana extends Gtk.Window{
        _init(){
            super._init({
                defaultWidth:200,
                defaultHeight: 200
            });
            this.connect('destroy', ()=>{
                Gtk.main_quit();
            });
            let layout = new Gtk.Grid({
                margin: 10
            });
            this.add(layout);
            let button = new Gtk.ScaleButton({
                icons: ['battery-empty', 'battery-full'],
                adjustment: new Gtk.Adjustment({
                    lower: 0,
                    upper: 99,
                    pageSize: 10,
                    pageIncrement: 5,
                    stepIncrement: 1,
                    value: 50
                })
            });
            button.connect('value-changed', () => {
                log('Has seleccionado un nuevo valor');
            });
            layout.attach(button, 0, 0, 1, 1);
        }
    }
);

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
