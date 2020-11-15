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
            let layout = new Gtk.FlowBox({
                margin: 10,
                homogeneous: false,
                "column-spacing": 10,
                "row-spacing": 10,
                "min-children-per-line": 2,
                "max-children-per-line": 4,
                "selection-mode": Gtk.SelectionMode.NONE,
                orientation: Gtk.Orientation.HORIZONTAL
            });
            this.add(layout);
            layout.add(new Gtk.Label({
                label: 'Etiqueta 1',
                halign: Gtk.Align.CENTER,
                valign: Gtk.Align.CENTER
            }));
            let button = new Gtk.Button({
                label: 'Dialogo',
                halign: Gtk.Align.CENTER,
                valign: Gtk.Align.CENTER
            });
            button.connect('clicked', () => {
                let dialog = new Gtk.MessageDialog({
                    title: 'Ejemplo',
                    text: 'Ejemplo de diálogo'
                });
                dialog.add_button('Si', Gtk.ResponseType.YES);
                dialog.run();
                dialog.destroy();
            });
            layout.add(button);
            layout.add(Gtk.Label.new('Button 2'));
            let button2 = new Gtk.Button({label: 'Para salir'});
            button2.connect('clicked', () => {
                print('Adios');
                Gtk.main_quit();
            });
            //layout.attach(button2, 0, 1, 1, 1);
            layout.add(button2);
        }
    }
);

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
