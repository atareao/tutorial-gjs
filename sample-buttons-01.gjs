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
            let layout = new Gtk.Grid({
                margin: 10
            });
            this.add(layout);
            let button = new Gtk.Button({
                label: 'Di_alogo',
                alwaysShowImage: true,
                focusOnClick: true,
                image: new Gtk.Image({iconName: 'starred'}),
                imagePosition: Gtk.PositionType.BOTTOM,
                relief: Gtk.ReliefStyle.NORMAL,
                useUnderline: true
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
            layout.attach(button, 0, 0, 1, 1);
            let button2 = new Gtk.Button({
                label: 'Di_alogo',
                alwaysShowImage: true,
                focusOnClick: true,
                image: new Gtk.Image({iconName: 'starred'}),
                imagePosition: Gtk.PositionType.BOTTOM,
                relief: Gtk.ReliefStyle.NORMAL,
                useUnderline: true
            });
            layout.attach(button2, 0, 0, 1, 1);
        }
    }
);

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
