"use client"

import { FormEventHandler } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { FaFloppyDisk } from 'react-icons/fa6';

import { TTestimonialForm } from '@/schemas/testimonials/testimonials.form.schemas';
import { Label } from "@/components/ui/form/Label";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/Textarea";
import { SpanError } from "@/components/ui/form/SpanError";
import { FormSection } from "@/components/ui/form/FormSection";
import { FormSectionTitle } from "@/components/ui/form/FormSectionTitle";
import { ActionButton } from "@/components/ui/buttons/ActionButton";

type TTestimonialFormProps = {
    register: UseFormRegister<TTestimonialForm>
    errors: FieldErrors<TTestimonialForm>
    onSubmit: FormEventHandler<HTMLFormElement>
    loading: boolean
    submitLabel: string
}

export const TestimonialForm = ({ register, errors, onSubmit, loading, submitLabel }: TTestimonialFormProps) => {
    return (
        <form className='space-y-8' onSubmit={onSubmit} noValidate>
            <FormSection>
                <FormSectionTitle>Datos del testimonio</FormSectionTitle>

            <div className="form-group">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Quién lo dice"
                    {...register("name")}
                />
                <SpanError message={errors.name?.message} />
            </div>

            <div className="form-group">
                <Label htmlFor="quote">Testimonio</Label>
                <Textarea
                    id="quote"
                    rows={4}
                    placeholder="Escribe el testimonio tal como lo dio el cliente"
                    {...register("quote")}
                />
                <SpanError message={errors.quote?.message} />
            </div>

            <div className="form-group">
                <Label htmlFor="rating">Valoración (de 0 a 5)</Label>
                <Input
                    type="number"
                    id="rating"
                    min={0}
                    max={5}
                    step={1}
                    {...register("rating", { valueAsNumber: true })}
                />
                <SpanError message={errors.rating?.message} />
            </div>
            </FormSection>


            <ActionButton loading={loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                {loading ? 'Guardando...' : submitLabel}
            </ActionButton>
        </form>
    )
}
