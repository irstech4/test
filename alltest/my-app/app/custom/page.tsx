"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

export default function CustomPage () {
  const [fields, setFields] = useState([
    { id: 1, type: "email", label: "Email", placeholder: "m@example.com" },
 
  ]); // Initial state with one email field

  const handleAddInput = () => {
    setFields([
      ...fields,
      {
        id: fields.length + 1,
        type: "text",
        label: "Custom Field",
        placeholder: "Enter a value",
      },
      
    ]);console.log("Added a new custom field");
  };

  const handleRemoveInput = (id: any) => {
    setFields(fields.filter((field) => field.id !== id));
    console.log(`Removed field with ID: ${id}`);
  };

  const handleInputChange = (event: any, fieldId: any) => {
    // Find the field being updated based on its ID
    const updatedFields = fields.map((field) => {
      if (field.id === fieldId) {
        return { ...field, value: event.target.value }; // Update value property
      }
      return field;
    });
        console.log(updatedFields)

    setFields(updatedFields);
  };

  const renderInputs = () => {
    return fields.map((field) => (
      <div key={field.id} className="grid gap-2">
        <Label htmlFor={`input-${field.id}`}>{field.label}</Label>
        {field.type === 'email' && (
          <Input
            id={`input_${field.id}`}
            type={field.type}
            placeholder={field.placeholder}
            required
            onChange={(event) => handleInputChange(event, field.id)} // Attach onChange handler
          />
        )}
        {field.type === 'text' && (
          <Input
            id={`input_${field.id}`}
            type={field.type}
            placeholder={field.placeholder}
            onChange={(event) => handleInputChange(event, field.id)} // Attach onChange handler
          />
        )}
        {fields.length > 1 && (
          <Button variant={'outline'} className="delete-button" onClick={() => handleRemoveInput(field.id)}>
            X
          </Button>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center space-y-4 justify-center">
      <Card className="w-full max-w-sm">
        {/* ... (rest of your Card component) */}
        <CardContent className="grid gap-4">
          {renderInputs()}
          <Button className="add-button" onClick={handleAddInput}>
            Add Custom Field
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


