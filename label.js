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
                    label: 'Ejemplo 1'
                }),
                false, false, 5
            );
            layout.pack_start(new Gtk.Label({
                    label: 'Ejemplo2: En un lugar de la mancha de cuyo nombre no quiero acordarme',
                    wrap: true,
                    wrap_mode: Pango.WrapMode.WORD,
                    "width-chars": 10,
                    justify: Gtk.Justification.FILL,
                    ellipsize: Pango.EllipsizeMode.MIDDLE,
                    selectable: false
                }),
                false, false, 5
            );
            layout.pack_start(new Gtk.Label({
                    label: '<b><span color="green">Ejemplo</span> 2</b>',
                    "use-markup": true
                }),
                false, false, 5
            );
            layout.pack_start(new Gtk.Label({
                    label: '<b>Ejemplo 2</b>',
                    angle: 45.0,
                    "use-markup": true
                }),
                false, false, 5
            );
        }
    }
);

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
