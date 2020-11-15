#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject} = imports.gi;

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
            let layout = new Gtk.ListBox({
                margin: 10,
                "selection-mode": Gtk.SelectionMode.SINGLE
            });
            this.add(layout);

            let row1 = new Gtk.ListBoxRow();
            layout.add(row1);
            let container1 = new Gtk.Box({
                margin: 5,
                orientation: Gtk.Orientation.HORIZONTAL,
                homogeneous: false,
                spacing: 10
            });
            row1.add(container1);
            let label1 = new Gtk.Label({label: 'Etiqueta 1'});
            container1.pack_start(label1, false, false, 5);
            let button1 = new Gtk.Button({label: 'Botón 1'});
            container1.pack_start(button1, false, false, 5);

            let row2 = new Gtk.ListBoxRow();
            layout.add(row2);
            let container2 = new Gtk.Box({
                margin: 5,
                orientation: Gtk.Orientation.HORIZONTAL,
                homogeneous: false,
                spacing: 10
            });
            row2.add(container2);
            let label2 = new Gtk.Label({label: 'Etiqueta 2'});
            container2.pack_start(label2, false, false, 5);
            let button2 = new Gtk.Button({label: 'Botón 2'});
            container2.pack_start(button2, false, false, 5);
        }
    }
);

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
