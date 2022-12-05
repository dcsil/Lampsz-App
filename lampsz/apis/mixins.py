from django.shortcuts import get_object_or_404


class MultipleFieldLookupMixin:
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """

    def get_object(self):
        queryset = self.get_queryset()  # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        lookup_filter = {}
        for field in self.lookup_fields:
            if self.kwargs.get(field):  # Ignore empty fields.
                lookup_filter[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **lookup_filter)  # Lookup the object
        self.check_object_permissions(self.request, obj)
        return obj
