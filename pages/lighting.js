import { useState } from "react";
import Aside from "./components/aside";
import Navbar from "./components/navbar";
import { HexColorPicker } from "react-colorful";

const Index = () => {

    const [color, setColor] = useState("#000000");

    const [selectedLight, setSelectedLight] = useState(-0);

    const [lights, setLights] = useState([
        { id: 0, col: 1, row: 1, color: "#000000", noAnimation: false },
        { id: 1, col: 1, row: 2, color: "#000000", noAnimation: false },
        { id: 2, col: 2, row: 2, color: "#000000", noAnimation: false },
        { id: 3, col: 3, row: 2, color: "#000000", noAnimation: false },
        { id: 4, col: 4, row: 2, color: "#000000", noAnimation: false },
        { id: 5, col: 5, row: 2, color: "#000000", noAnimation: false },
        { id: 0, col: 5, row: 1, color: "#000000", noAnimation: false },
    ]);

    function lightClick(light) {
        setSelectedLight(selectedLight == light ? -1 : light)
        setColor(lights[light].color)
    }

    function colorChanged(color) {
        setLights(lights.map(light => {
            if (light.id == selectedLight) {
                return { ...light, color: color };
            }
            return light;
        }))
        setColor(color)
        sendValues()
    }


    async function sendValues() {
        await fetch("/api/lighting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lights),
        });
    }

    return (
        <div class="h-screen bg-black">
            {Navbar("Lighting")}

            <Aside></Aside>

            <main class="md:ml-64 h-auto pt-20 flex flex-col items-center justify-center">
                <div class="w-full md:w-auto flex flex-col md:flex-row items-center justify-center">
                    <div class="bg-slate-900 w-64 h-64 md:w-auto md:h-auto rounded-2xl flex items-center justify-center md:mr-10 p-10">
                        <HexColorPicker color={color} onChange={colorChanged} className={`${selectedLight == -1 ? "opacity-40" : ""} transition-all`} />
                    </div>
                    <div class="text-black bg-slate-900 rounded-2xl p-5  mt-5 md:mt-0">
                        <div class="grid gap-4  md:grid-cols-5">
                            {lights.map((light) => (
                                <div
                                    key={light.id}
                                    onClick={() => lightClick(light.id)}
                                    class={`sm:w-16 sm:h-16 h-10 w-10 md:w-20 md:h-20 flex items-center justify-center m-2 md:m-5 col-start-${light.col} row-start-${light.row}`}
                                >
                                    <div
                                        class={`light ${selectedLight == light.id ? "lightSelected" : ""}`}
                                        style={{ backgroundColor: light.color }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Index;
