import { Form, FormGroup, FormFeedback, Label, Input, Button } from "reactstrap";

export const FormInput = () => {
  return (
    <Form className="bg-white px-3 pt-3" encType="multipart/form-data">
      <FormGroup floating>
        <Input
          type="textarea"
          placeholder="Type your post here..."
          id="floatingTextarea2"
          name="text"
          required
        />
        <FormFeedback invalid="true">Title cannot be blank!</FormFeedback>
        <Label htmlFor="floatingTextarea2 fw-bold">
          Type your post here...
        </Label>
      </FormGroup>
      <hr className="dropdown-divider" />
      <div className="d-flex justify-content-end align-items-center">
        <FormGroup className="me-auto mt-2">
          <Label htmlFor="image-upload">
            <i className="fas fa-2x fa-image" role="button"></i>
          </Label>
          <Input
            id="image-upload"
            name="post-picture"
            type="file"
            className="d-none"
            multiple
          />
        </FormGroup>
        <FormGroup>
          <Input type="select" name="postTo" required>
            <option>THS1 - Thesis Writing 1</option>
            <option>THS2 - Thesis Writing 2</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Button className="ms-3">Post</Button>
        </FormGroup>
      </div>
    </Form>
  );
};
