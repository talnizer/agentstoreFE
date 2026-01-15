import React, { useEffect, useState } from 'react';
import AIToolsService from '../../Services/AIToolsService';
import useService from '../../hooks/useService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
// import Form from "react-bootstrap/Form";
import { Tones } from '../../constants/Tones';
import { Audiences, Length, Platform, Topics } from './PostConstants';
import AuthUser from '../Common/AuthUser';

export default function PostFilters(props) {
    const [inputs, setInputs] = useState({
    });
    const [generatingPosts, setGeneratingPosts] = useState(false);
    const { user } = AuthUser();

    const aiToolsService = useService(AIToolsService);
    useEffect(() => {
    }, []);

    function gen() {
        setGeneratingPosts(true);
        console.log(inputs);
        aiToolsService.generatePost(inputs).subscribe({
            next: response => {
                if (response.status !== 0) {
                    props.generatedDraft(response.drafts);
                }
                else {
                    toast.dismiss();
                    toast.error(response.message);
                }
            },
            error: e => {
            },
            complete: () => { setGeneratingPosts(false); },
        });

    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        let finalValue;
        if (type === 'checkbox') {
            finalValue = checked;
        } else if (type === 'number' || name === 'hashtagCount') {
            // Ensure numbers and range values are integers
            finalValue = parseInt(value, 10) || 0;
        } else {
            finalValue = value;
        }

        setInputs((prev) => {
            const newInputs = { ...prev, [name]: finalValue };

            // Logic: If the 'with_hashtags' toggle is turned OFF, 
            // reset the hashtag count to 0 automatically.
            if (name === 'with_hashtags' && !checked) {
                newInputs.hashtagCount = 0;
            }
            // Logic: If the user slides the range > 0, 
            // turn the 'with_hashtags' toggle ON automatically.
            else if (name === 'hashtagCount' && finalValue > 0) {
                newInputs.with_hashtags = true;
            }

            return newInputs;
        });
    };

    return (
        <div>
            {/* <h2>Dashboard</h2> */}
            <div className='bg-light text-center mb-5 sticky-top'>
                <Form onSubmit={(e) => { e.preventDefault(); gen(); }} className='pt-3 container'>
                    <h3>Social Post Agent</h3>
                    <Row className="justify-content-center">
                        <Col md={11}>

                            {/* Select Fields Row */}
                            <Row className="mb-3 g-3">
                                <Col lg={3} md={4} sm={6}>
                                    <Form.Group controlId="topicSelect">
                                        <Form.Label className="small text-muted">Topic/Niche</Form.Label>
                                        <Form.Select
                                            className="text-capitalize form-select-lg"
                                            name="topic"
                                            value={inputs?.topic || ""}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option disabled value="">Select Topic</option>
                                            {user &&
                                                <option value="custom_option">
                                                    -- Custom --
                                                </option>
                                            }
                                            {!user &&
                                                <option disabled value="custom_option">
                                                    -- Custom (Login Required) --
                                                </option>
                                            }
                                            {Topics.map((item, index) => {
                                                let disabled = !user && index > 0;
                                                return (
                                                    <option disabled={disabled} key={index} value={item.name}>{item.name}</option>
                                                );
                                            })
                                            }

                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                {/* Only show this input if "Other" is selected */}
                                {inputs.topic === "custom_option" && (
                                    <Col md={3}>
                                        <Form.Group controlId="customTopicInput">
                                            <Form.Label className="small text-muted">Type Custom Topic</Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control-lg"
                                                name="customTopic"
                                                placeholder="e.g. Quantum Computing"
                                                value={inputs?.customTopic || ""}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                )}
                                <Col lg={3} md={4} sm={6}>
                                    <Form.Group controlId="platformSelect">
                                        <Form.Label className="small text-muted">Platform</Form.Label>
                                        <Form.Select
                                            className="text-capitalize form-select-lg"
                                            name="platform"
                                            value={inputs?.platform || ""}
                                            onChange={handleChange}
                                        // required
                                        >
                                            <option disabled value="">Select Platform</option>
                                            {Platform.map((item, index) => {
                                                let disabled = !user && index > 0;
                                                return (
                                                    <option disabled={disabled} key={index} value={item.name}>{item.name}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col lg={3} md={4} sm={6}>
                                    <Form.Group controlId="toneSelect">
                                        <Form.Label className="small text-muted">Tone</Form.Label>
                                        <Form.Select
                                            className="text-capitalize form-select-lg"
                                            name="tone"
                                            value={inputs?.tone || ""}
                                            onChange={handleChange}
                                        // required
                                        >
                                            <option disabled value="">Select Tone</option>
                                            {Tones.map((item, index) => {
                                                let disabled = !user && index > 0;
                                                return (
                                                    <option disabled={disabled} key={index} value={item.name}>{item.name}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col lg={3} md={4} sm={6}>
                                    <Form.Group controlId="lengthSelect">
                                        <Form.Label className="small text-muted">Length</Form.Label>
                                        <Form.Select
                                            className="text-capitalize form-select-lg"
                                            name="length"
                                            value={inputs?.length || ""}
                                            onChange={handleChange}
                                        // required
                                        >
                                            <option disabled value="">Select Length</option>
                                            {Length.map((item, index) => {
                                                let disabled = !user && index > 0;
                                                return (
                                                    <option disabled={disabled} key={index} value={item.name}>{item.name}</option>
                                                )
                                            }
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col lg={3} md={4} sm={6}>
                                    <Form.Group controlId="countInput">
                                        <Form.Label className="small text-muted">Number of Posts</Form.Label>
                                        <Form.Control
                                            type="number"
                                            className="form-control-lg"
                                            name="count"
                                            value={inputs?.count || 1}
                                            onChange={handleChange}
                                            min="1"
                                            max="5"
                                        // required
                                        />
                                        <Form.Text className="text-muted">
                                            Select 1 to 5
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                {/* Target Audience Section */}
                                <Form.Group className="mb-3">
                                    <Form.Label className="small text-muted">Target Audience</Form.Label>
                                    <div className="d-flex flex-wrap gap-3 p-3 border rounded">
                                        {/* <Form.Group controlId="targetAudience"> */}

                                        <Form.Select
                                            className="text-capitalize form-select-lg"
                                            name="selectedAudience"
                                            value={inputs?.selectedAudience || ""}
                                            onChange={handleChange}
                                        // required
                                        >
                                            <option disabled value="">Select Audience</option>
                                            {user &&
                                                <option value="custom_option">-- Custom --</option>
                                            }
                                            {!user &&
                                                <option disabled value="custom_option">-- Custom (Login Required)--</option>
                                            }
                                            {Audiences.map((item, index) => {
                                                let disabled = !user && index > 0;
                                                return (
                                                    <option disabled={disabled} key={index} value={item.name}>{item.name}</option>
                                                )
                                            })}
                                        </Form.Select>
                                        {/* </Form.Group> */}

                                        {/* Only show this input if "Other" is selected */}
                                        {inputs.selectedAudience === "custom_option" && (
                                            // <Col md={3}>
                                            <Form.Group controlId="customAudience">
                                                <Form.Label className="small text-muted">Type Custom Audience</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    className="form-control-lg"
                                                    name="customAudience"
                                                    placeholder="Describe your custom audience (e.g., 'Freelance Graphic Designers in India')"
                                                    value={inputs?.customAudience || ""}
                                                    onChange={handleChange}
                                                    required
                                                    maxLength={50}
                                                />
                                            </Form.Group>
                                            // </Col>
                                        )}
                                    </div>
                                </Form.Group>
                            </Row>


                            {/* Checkboxes Section */}
                            <div className="d-flex gap-4 mb-3 p-2 bg-light rounded">
                                <Form.Check
                                    type="checkbox"
                                    disabled={user ? false : true}
                                    id="with_hashtags"
                                    name="with_hashtags"
                                    label={"With Hashtags?" + (user ? "" : " (Login Required)")}
                                    checked={!!inputs.with_hashtags}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="with_emojis"
                                    disabled={user ? false : true}
                                    name="with_emojis"
                                    label={"With Emojis?" + (user ? "" : " (Login Required)")}
                                    checked={!!inputs.with_emojis}
                                    onChange={handleChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="in_bullet_points"
                                    disabled={user ? false : true}
                                    name="in_bullet_points"
                                    label={"With Bullet Points?" + (user ? "" : " (Login Required)")}
                                    checked={!!inputs.in_bullet_points}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Instructions Textarea */}
                            <Form.Group className="mb-3" controlId="instructionsText">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    className="form-control-lg"
                                    name="instructions"
                                    placeholder="Write some additional instructions (optional)"
                                    value={inputs.instructions || ""}
                                    onChange={handleChange}
                                    maxLength={200}
                                />
                                <Form.Text className="text-muted">
                                    Max 200 characters.
                                </Form.Text>
                            </Form.Group>

                            {/* Submit Button */}
                            <div className="text-center mb-2">
                                <Button
                                    variant="dark"
                                    size="lg"
                                    type="submit"
                                    disabled={generatingPosts}
                                    className="px-5"
                                >
                                    {generatingPosts ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            <span className="ms-2">Generating...</span>
                                        </>
                                    ) : (
                                        "Generate Post"
                                    )}
                                </Button>
                            </div>
                            {!user &&
                                <div className='text-left mb-4'><small className='text-danger'>*Some Fields are disabled. Login to enable them.</small></div>
                            }
                        </Col>
                    </Row>
                </Form>

            </div>
        </div>
    );
}
