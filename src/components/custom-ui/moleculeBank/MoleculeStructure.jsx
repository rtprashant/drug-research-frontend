import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import initRDKit from '@rdkit/rdkit';

const MoleculeStructure = ({
    id,
    className = "",
    svgMode = false,
    width = 250,
    height = 200,
    structure,
    subStructure = "",
    extraDetails = {},
    drawingDelay,
    scores = 0,
}) => {
    const [svg, setSvg] = useState(undefined);
    const [rdKitLoaded, setRdKitLoaded] = useState(false);
    const [rdKitError, setRdKitError] = useState(false);
    const canvasRef = useRef(null); // Create a ref for the canvas

    const MOL_DETAILS = {
        width,
        height,
        bondLineWidth: 1,
        addStereoAnnotation: true,
        ...extraDetails,
    };

    useEffect(() => {
        const loadRDKit = async () => {
            try {
                const RDKit = await initRDKit();
                setRdKitLoaded(true);
                return RDKit;
            } catch (e) {
                setRdKitError(true);
                console.error(e);
            }
        };

        loadRDKit(); // Load RDKit when component mounts
    }, []);

    useEffect(() => {
        const drawMolecule = async (RDKit) => {
            const canvas = canvasRef.current; // Access the canvas via the ref
            if (!canvas) {
                console.error(`Canvas with id "${id}" not found.`);
                return;
            }

            try {
                const mol = RDKit.get_mol(structure || "invalid");
                const qmol = subStructure ? RDKit.get_qmol(subStructure) : null;
                
                // Check if the molecule was created successfully
                if (!mol || mol.get_num_atoms() === 0) {
                    console.error("Invalid or empty molecule structure.");
                    return;
                }

                if (svgMode) {
                    const svg = mol.get_svg_with_highlights(getMolDetails(mol, qmol));
                    setSvg(svg);
                } else {
                    mol.draw_to_canvas_with_highlights(canvas, getMolDetails(mol, qmol));
                }

                mol.delete();
                if (qmol) qmol.delete();
            } catch (error) {
                console.error("Error drawing molecule:", error);
            }
        };

        if (rdKitLoaded && structure) {
            const initAndDrawRDKit = async () => {
                const RDKit = await initRDKit(); // Load RDKit
                drawMolecule(RDKit); // Draw the molecule
            };

            initAndDrawRDKit();
        }
    }, [rdKitLoaded, structure, subStructure, svgMode]);

    const getMolDetails = (mol, qmol) => {
        if (mol && qmol) {
            const subStructHighlightDetails = JSON.parse(mol.get_substruct_matches(qmol));
            const subStructHighlightDetailsMerged = !_.isEmpty(subStructHighlightDetails)
                ? subStructHighlightDetails.reduce(
                    (acc, { atoms, bonds }) => ({
                        atoms: [...acc.atoms, ...atoms],
                        bonds: [...acc.bonds, ...bonds],
                    }),
                    { bonds: [], atoms: [] }
                )
                : subStructHighlightDetails;

            return JSON.stringify({
                ...MOL_DETAILS,
                ...extraDetails,
                ...subStructHighlightDetailsMerged,
            });
        } else {
            return JSON.stringify({
                ...MOL_DETAILS,
                ...extraDetails,
            });
        }
    };

    if (rdKitError) {
        return "Error loading renderer.";
    }

    if (!rdKitLoaded) {
        return "Loading renderer...";
    }

    if (!svgMode) {
        return (
            <div className={`molecule-canvas-container ${className}`}>
                <canvas ref={canvasRef} width={width} height={height}></canvas>
                {scores ? <p className="text-red-600 z-50 p-10">Score: {scores.toFixed(2)}</p> : ""}
            </div>
        );
    } else {
        return (
            <div
                className={`molecule-structure-svg ${className}`}
                style={{ width, height }}
                dangerouslySetInnerHTML={{ __html: svg }}
            ></div>
        );
    }
};

MoleculeStructure.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    svgMode: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    structure: PropTypes.string.isRequired,
    subStructure: PropTypes.string,
    extraDetails: PropTypes.object,
    drawingDelay: PropTypes.number,
    scores: PropTypes.number,
};

export default MoleculeStructure;
