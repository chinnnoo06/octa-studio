"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFloppyDisk } from "react-icons/fa6";
import { toast } from "react-toastify";

import { BlogCategoryFormSchema, TBlogCategoryForm } from "@/schemas/blogCategory/blogCategory.form.schemas";
import { useBlogCategory } from "@/hooks/useBlogCategory";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { ADMIN_FORM_ID } from "@/components/ui/buttons/FormSubmitButton";
import { BlogCategoryFields } from "./BlogCategoryFields";

export const CreateBlogCategoryForm = () => {
    const router = useRouter();

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TBlogCategoryForm>({
        resolver: zodResolver(BlogCategoryFormSchema),
        defaultValues: { name: "", slug: "", description: "", seo: { metaTitle: "", metaDescription: "" } },
    });

    const { createBlogCategory } = useBlogCategory();

    useEffect(() => {
        if (createBlogCategory.error) toast.error(createBlogCategory.error);
        if (createBlogCategory.success) {
            toast.success(createBlogCategory.success);
            router.push("/admin/blog-categorias");
        }
    }, [createBlogCategory.error, createBlogCategory.success, router]);

    const onSubmit = (data: TBlogCategoryForm) => createBlogCategory.handleCreateBlogCategory(data);

    return (
        <form id={ADMIN_FORM_ID} className="mx-auto flex w-full max-w-240 flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <BlogCategoryFields register={register} control={control} setValue={setValue} errors={errors} />

            <ActionButton loading={createBlogCategory.loading} className="w-full">
                <FaFloppyDisk aria-hidden="true" className="size-4 lg:size-4.5" />
                {createBlogCategory.loading ? "Guardando..." : "Crear categoría"}
            </ActionButton>
        </form>
    );
};
