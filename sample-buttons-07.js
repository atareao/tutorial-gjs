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
            let button = new Gtk.FontButton({
                fontName: 'Ubuntu 40',
                showSize: true,
                showStyle: true,
                title: 'Selecciona una fuente',
                useFont: true,
                useSize: true
            });
            button.connect('font-set', () => {
                log('Has seleccionado una nueva tipografía');
            });
            layout.attach(button, 0, 0, 1, 1);
        }
    }
);

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
