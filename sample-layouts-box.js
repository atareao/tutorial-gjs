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
            let layout = new Gtk.Box({
                margin: 10,
                orientation: Gtk.Orientation.VERTICAL,
                "baseline-position": Gtk.BaselinePosition.CENTER,
                homogeneous: false,
                spacing: 20
            });
            this.add(layout);
            let button = new Gtk.Button({label: 'Dialogo'});
            button.connect('clicked', () => {
                let dialog = new Gtk.MessageDialog({
                    title: 'Ejemplo',
                    text: 'Ejemplo de diálogo'
                });
                dialog.add_button('Si', Gtk.ResponseType.YES);
                dialog.run();
                dialog.destroy();
            });
            layout.pack_start(button, false, true, 5);
            let button2 = new Gtk.Button({label: 'Para salir'});
            button2.connect('clicked', () => {
                print('Adios');
                Gtk.main_quit();
            });
            layout.pack_start(button2, true, true, 5);
        }
    }
);

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
