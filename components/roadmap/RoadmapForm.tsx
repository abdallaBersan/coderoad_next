"use client";

import { RoadmapInputs } from "@/types/types";
import { useState } from "react";

import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";

interface RoadmapFormProps {
  initialData?: RoadmapInputs;
  onSubmit: SubmitHandler<RoadmapInputs>;
  submitLabel: string;
  onDelete?: () => void;
  isEditing?: boolean;
}

console.log("RoadmapForm date: ", new Date().toISOString());
console.log("RoadmapForm date split: ", new Date().toISOString().split("T"));

const RoadmapForm = ({
  initialData,
  onSubmit,
  submitLabel,
  onDelete,
  isEditing,
}: RoadmapFormProps) => {
  const [selectedGroup, setSelectedGroup] = useState(
    initialData?.group || "challenge"
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoadmapInputs>({
    defaultValues: initialData
      ? {
          ...initialData,
          createdAt: initialData.createdAt
            ? new Date(initialData.createdAt).toISOString().slice(0, 16) // Convertir au format yyyy-mm-ddTHH:MM
            : "",
        }
      : {
          title: "",
          description: "",
          status: "todo",
          github: "",
          type: "frontend",
          group: "challenge",
          createdAt: new Date().toISOString().slice(0, 16),
        },
  });

  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">{submitLabel}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TitleInput register={register} errors={errors} />
          <DescriptionInput register={register} errors={errors} />

          {!isEditing && <StatusInput register={register} errors={errors} />}

          <GroupInput
            register={register}
            errors={errors}
            onGroupChange={(value) => setSelectedGroup(value)}
          />
          <TypeInput
            register={register}
            errors={errors}
            selectedGroup={selectedGroup}
            isEditing={isEditing}
          />
          <DateInput register={register} errors={errors} />
          <div className="my-2 mt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              {submitLabel}
            </button>
          </div>

          {isEditing && (
            <div className="my-2 mt-7">
              <button
                type="button"
                onClick={onDelete}
                className="btn btn-error w-full"
              >
                Supprimer
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Réutilisez les composants TitleInput, DescriptionInput, etc. ici.
const TitleInput = ({
  register,
  errors,
}: {
  register: UseFormRegister<RoadmapInputs>;
  errors: FieldErrors<RoadmapInputs>;
}) => (
  <div className="my-2">
    <label className="label" htmlFor="title">
      Titre
    </label>
    <input
      type="text"
      id="title"
      className="input input-bordered w-full max-w-sm"
      {...register("title", {
        required: "Title is required",
      })}
    />
    {errors.title?.message && (
      <div className="text-error">{errors.title.message}</div>
    )}
  </div>
);

const DescriptionInput = ({
  register,
  errors,
}: {
  register: UseFormRegister<RoadmapInputs>;
  errors: FieldErrors<RoadmapInputs>;
}) => (
  <div className="my-2">
    <label className="label" htmlFor="description">
      Description
    </label>
    <textarea
      id="description"
      className="textarea textarea-bordered w-full max-w-sm"
      {...register("description", {
        required: "Description is required",
      })}
    />
    {errors.description?.message && (
      <div className="text-error">{errors.description.message}</div>
    )}
  </div>
);

const StatusInput = ({
  register,
  errors,
}: {
  register: UseFormRegister<RoadmapInputs>;
  errors: FieldErrors<RoadmapInputs>;
}) => (
  <div className="my-2">
    <label className="label" htmlFor="status">
      Status
    </label>
    <select
      id="status"
      className="select select-bordered w-full max-w-sm"
      {...register("status", {
        required: "Status is required",
      })}
    >
      <option value="in progress">In progress</option>
      <option value="done">Done</option>
      <option value="todo">To do</option>
    </select>
    {errors.status?.message && (
      <div className="text-error">{errors.status.message}</div>
    )}
  </div>
);

const GroupInput = ({
  register,
  errors,
  onGroupChange,
}: {
  register: UseFormRegister<RoadmapInputs>;
  errors: FieldErrors<RoadmapInputs>;
  onGroupChange: (value: string) => void;
}) => (
  <div className="my-2">
    <label className="label" htmlFor="group">
      Groupe
    </label>
    <select
      id="group"
      className="select select-bordered w-full max-w-sm"
      {...register("group", {
        required: "Group is required",
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
          onGroupChange(e.target.value),
      })}
    >
      <option value="challenge">Challenge</option>
      <option value="projet">Projet</option>
    </select>
    {errors.group?.message && (
      <div className="text-error">{errors.group.message}</div>
    )}
  </div>
);

const TypeInput = ({
  register,
  errors,
  selectedGroup,
  isEditing,
}: {
  register: UseFormRegister<RoadmapInputs>;
  errors: FieldErrors<RoadmapInputs>;
  selectedGroup: string;
  isEditing: boolean | undefined;
}) => {
  const options =
    selectedGroup === "projet"
      ? ["Fullstack", "Frontend", "Backend"]
      : ["Frontend", "Backend"];

  const defaultValue =
    !isEditing && selectedGroup === "projet" ? options[0] : undefined;

  return (
    <div className="my-2">
      <label className="label" htmlFor="type">
        Type
      </label>
      <select
        id="type"
        value={defaultValue}
        className="select select-bordered w-full max-w-sm"
        {...register("type", {
          required: "Type is required",
          value: !isEditing ? "Fullstack" : undefined,
        })}
      >
        {options.map((option) => (
          <option key={option.toLowerCase()} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
      {errors.type?.message && (
        <div className="text-error">{errors.type.message}</div>
      )}
    </div>
  );
};

const DateInput = ({
  register,
  errors,
}: {
  register: UseFormRegister<RoadmapInputs>;
  errors: FieldErrors<RoadmapInputs>;
}) => (
  <div className="my-2">
    <label className="label" htmlFor="createdAt">
      Date de création
    </label>
    <input
      type="datetime-local"
      id="createdAt"
      className="input input-bordered w-full max-w-sm"
      {...register("createdAt", {
        required: "Created at is required",
        setValueAs: (value) => (value ? new Date(value).toISOString() : null),
      })}
    />
    {errors.createdAt?.message && (
      <div className="text-error">{errors.createdAt.message}</div>
    )}
  </div>
);

export default RoadmapForm;
