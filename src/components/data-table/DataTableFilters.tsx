import React from "react";
import {Card, Col, Form, Row} from "react-bootstrap";
import {DataTableFilter, DataTableFilterSetting} from "./DataTable";

export interface DataTableFiltersProps {
    filters: DataTableFilter[],
    onChange: Function,
    currentFilterSettings: DataTableFilterSetting[]
}

const DataTableFilters: React.FC<DataTableFiltersProps> = ({filters, onChange, currentFilterSettings}) => {
    if (filters.length === 0) {
        return null;
    }

    /**
     * Method to determine if a filter option is selected.
     * @param filterName
     * @param filterValue
     */
    const isSelected = (filterName: string, filterValue: string) => {
        const filter = currentFilterSettings.find(f => f.name === filterName);
        if (!filter) {
            return false;
        }

        return filter.value === filterValue;
    }

    return (
        <Card className="mb-5">
            <Card.Header>
                Filters
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <Form>
                            <Row>
                                {
                                    filters.map((filter) => (
                                        <Col xs={12} sm={4} md={3} lg={2} key={filter.name}>
                                            <Form.Group controlId={filter.name} key={filter.name}>
                                                <Form.Label>{filter.label}</Form.Label>
                                                <Form.Control as="select"
                                                              onChange={(e) => onChange(filter.name, e.target.value)}>
                                                    {
                                                        filter.options.map((option) => (
                                                            <option value={option.value}
                                                                    key={option.value}
                                                                    selected={isSelected(filter.name, option.value)}
                                                            >{option.label}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    ))
                                }
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default DataTableFilters;