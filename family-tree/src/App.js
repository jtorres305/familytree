import React from 'react';
import ReactFlow, { Controls } from 'react-flow-renderer';

const initialNodes = [
    { id: '1', data: { label: 'Marteen Norwood' }, position: { x: 250, y: 0 } },
    { id: '2', data: { label: 'Rudolph Levarity' }, position: { x: 25, y: 100 } },
    { id: '3', data: { label: 'Keity Levarity' }, position: { x: 325, y: 100 } },
    { id: '4', data: { label: 'Kelvin Levarity' }, position: { x: 175, y: 100 } },
    { id: '5', data: { label: 'LaTrese Torres' }, position: { x: 475, y: 100 } },
    { id: '6', data: { label: 'Kristy Conley' }, position: { x: 25, y: 200 } },
    { id: '7', data: { label: 'Zanetta Levarity' }, position: { x: 175, y: 200 } },
    { id: '8', data: { label: 'Jarret Torres' }, position: { x: 475, y: 200 } },
    { id: '9', data: { label: 'Caitlin Torres' }, position: { x: 625, y: 200 } },
    { id: '10', data: { label: 'Giselle Conley' }, position: { x: -125, y: 300 } },
    { id: '11', data: { label: 'Nyla Conley' }, position: { x: 25, y: 300 } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e1-4', source: '1', target: '4' },
    { id: 'e1-5', source: '1', target: '5' },
    { id: 'e2-6', source: '2', target: '6' },
    { id: 'e4-7', source: '4', target: '7' },
    { id: 'e5-8', source: '5', target: '8' },
    { id: 'e5-9', source: '5', target: '9' },
    { id: 'e6-10', source: '6', target: '10' },
    { id: 'e6-11', source: '6', target: '11' },
];

function App() {
    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default App;
