#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject, Pango} = imports.gi;

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
            let layout = new Gtk.Box();
            this.add(layout);
            layout.pack_start(new Gtk.Label({
                    label: 'Ejemplo 1',
                    "width-chars": 20,
                    xalign: 0,
                    yalign: 0,
                    margin: 5
                }),
                false, false, 5
            );
            layout.pack_start(new Gtk.Label({
                    label: 'Ejemplo 1',
                    "width-chars": 20,
                    xalign: 0.5,
                    yalign: 0.5,
                    margin: 5
                }),
                false, false, 5
            );
            layout.pack_start(new Gtk.Label({
                    label: 'Ejemplo 1',
                    "width-chars": 20,
                    xalign: 1,
                    yalign: 1,
                    margin: 5
                }),
                false, false, 5
            );
        }
    }
);

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
