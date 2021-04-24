import {Card, Col, Form, Row} from "react-bootstrap";
import React from "react";

export interface DataTableSearchProps {
    currentSearchParam?: string | null;
    onSearch: Function
}

const DataTableSearch: React.FC<DataTableSearchProps> = ({currentSearchParam, onSearch}) => {
    const [term, setTerm] = React.useState('');

    const search = (e: any) => {
        e.preventDefault();
        onSearch(term);
    }

    return (
        <Row>
            <Col>
                <Form onSubmit={search}>
                    <Form.Group controlId="search">
                        <Form.Label>Search</Form.Label>
                        <Form.Control as="input" type="text"
                                      defaultValue={currentSearchParam ? currentSearchParam : ''}
                                      onChange={(e) => setTerm(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Col>

        </Row>
        )
}

export default DataTableSearch;